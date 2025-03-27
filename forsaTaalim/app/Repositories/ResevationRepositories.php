<?php
namespace App\Repositories;

use App\Interface\PaymentGatewayInterface;
use App\Models\Reservation;
use App\Models\Payment;
use DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Exception;
use Termwind\Components\Dd;
use function Laravel\Prompts\select;

class ResevationRepositories
{
    protected $gateway;
    protected $model;


    public function __construct(PaymentGatewayInterface $gateway, Reservation $model)
    {
        $this->gateway = $gateway->getGateway();
        $this->model = $model;

    }
    public function createReservations($data, $id)
    {
        try {
            $reservation = Reservation::create([
                'professeur_id' => $id,
                'etudiant_id' => Auth::id(),
                'status' => 'pending',
            ]);

            if (!$reservation) {
                return response()->json(['message' => 'Failed to create reservation'], 400);
            }

            $response = $this->gateway->purchase([
                'amount' => $data['amount'],
                'currency' => env('PAYPAL_CURRENCY', 'USD'),
                'returnUrl' => url('api/payment/success'),
                'cancelUrl' => url('api/payment/cancel')
            ])->send();

            if ($response->isRedirect()) {
                return response()->json([
                    'message' => 'Redirecting to PayPal for payment',
                    'redirect_url' => $response->getRedirectUrl()
                ], 200);
            } else {
                return response()->json(['message' => $response->getMessage()], 400);
            }
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
    public function success($validatedData)
    {
        if (!isset($validatedData['paymentId']) || !isset($validatedData['PayerID'])) {
            return response()->json(['message' => 'Payment details are incomplete or missing.'], 400);
        }

        try {
            $transaction = $this->gateway->completePurchase([
                'payer_id' => $validatedData['PayerID'],
                'transactionReference' => $validatedData['paymentId']
            ]);

            $response = $transaction->send();

            if ($response->isSuccessful()) {
                $arr = $response->getData();
                $lastInsertId = Reservation::latest()->first();
                $payment = new Payment();
                $payment->payment_id = $arr['id'];
                $payment->payer_id = (string) $arr['payer']['payer_info']['payer_id'];
                $payment->payer_email = $arr['payer']['payer_info']['email'];
                $payment->amount = $arr['transactions'][0]['amount']['total'];
                $payment->payment_status = $arr['state'];
                $payment->currencym = $arr['transactions'][0]['amount']['currency'];
                $payment->user_id = Auth::id();
                $payment->reservation_id = $lastInsertId->id;

                $payment->save();

                return response()->json(['message' => 'Paiement effectué avec succès !']);
            } else {
                return response()->json(['message' => 'Échec du paiement', 'error' => $response->getMessage()], 400);
            }
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred while processing the payment.', 'error' => $e->getMessage()], 500);
        }
    }
    public function getAllReservations()
    {
        return DB::table('reservations as r')
            ->leftJoin('users as u1', 'r.etudiant_id', '=', 'u1.id')
            ->leftJoin('users as u2', 'r.professeur_id', '=', 'u2.id')
            ->Join('payments as pa', 'r.id', '=', 'pa.reservation_id')
            ->select(
                'r.id',
                'u2.name as etudiant',
                'u1.name as professeur',
                'r.status',
                'pa.payment_id',
                'pa.payer_id',
                'pa.amount',
                'pa.currencym',
                'pa.payment_status',
                'r.updated_at',
                'u.role'
            )->get();
    }
    public function getByIdReservations($id)
    {
        return DB::table('reservations as r')
            ->leftJoin('users as u1', 'r.etudiant_id', '=', 'u1.id')
            ->leftJoin('users as u2', 'r.professeur_id', '=', 'u2.id')
            ->Join('payments as pa', 'r.id', '=', 'pa.reservation_id')
            ->select(
                'r.id',
                'u2.name as etudiant',
                'u1.name as professeur',
                'r.status',
                'pa.payment_id',
                'pa.payer_id',
                'pa.amount',
                'pa.currencym',
                'pa.payment_status',
                'r.updated_at'
            )
            ->where('r.id', '=', $id)
            ->get();
    }
    public function updateStatusReservationsToApproved($id)
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->update(['status' => 'approved']);
        return [
            'reservation' => $reservation
        ];
    }
    public function updateStatusReservationsTorefuser($id)
    {
       
        $reservation = Reservation::findOrFail($id);
        $reservation->update(['status' => 'refuser']);

        return [
            'reservation' => $reservation,
        ];
    }
    public function deleteReservations($id)
    {
        return $this->model->findOrFail($id)->delete();
    }
    public function reserverProfesseur()
    {
        return DB::table('reservations as r')
            ->leftJoin('users as u1', 'r.etudiant_id', '=', 'u1.id')
            ->leftJoin('users as u2', 'r.professeur_id', '=', 'u2.id')
            ->join('payments as pa', 'r.id', '=', 'pa.reservation_id')
            ->select(
                'u2.name as etudiant',
                'u1.name as professeur',
                'r.status',
                'pa.payment_id',
                'pa.payer_id',
                'pa.amount',
                'pa.currencym',
                'pa.payment_status',
                'r.updated_at',
                'u2.role'
            )
            ->where('u2.role', '=', 'tuteur') 
            ->get();
    }
    
}