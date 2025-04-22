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
            $reservation_id = Reservation::where('etudiant_id' ,'=',Auth::id())->where('professeur_id','=',$id)->count();
        //    if ($reservation_id == 0) {
             $reservation = Reservation::create([
                'professeur_id' => $id,
                'etudiant_id' => Auth::id(),
                'date_reservation' => $data['date_reservation'],
                'time_reservation' => $data['time_reservation'],
                'dura'=>$data['dura'],
                'status' => 'pending',
            ]);

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
        //    }else{
        //     return response()->json(['message' => 'this reservation found'], 400);
            
        //    }
           
           
        } catch (Exception $e) {
            return response()->json(['message' => 'An error occurred: ' . $e->getMessage()], 500);
        }
    }
    public function success($validatedData)
    {
        if (!isset($validatedData['paymentId']) || !isset($validatedData['PayerID'])) {
            return redirect()->away('http://localhost:3000/payment/failed?error=missing_parameters');
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
                $payment->user_id = $lastInsertId->etudiant_id;
                $payment->reservation_id = $lastInsertId->id;

                $payment->save();

                return $lastInsertId->professeur_id;
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
        
        return  DB::table('reservations as r')
        ->leftJoin('users as u1', 'r.etudiant_id', '=', 'u1.id')
        ->leftJoin('users as u2', 'r.professeur_id', '=', 'u2.id')
        ->leftJoin('chats as chat', 'u1.id', '=', 'chat.sender_id')
        ->join('payments as pa', 'r.id', '=', 'pa.reservation_id')
        ->select(
            'u2.name as professeur',
            'u1.name as etudiant',
            'r.status',
            'r.dura',
            'pa.payment_id',
            'pa.payer_id',
            'pa.amount',
            'pa.currencym',
            'pa.payment_status',
            'r.updated_at',
            'u2.role',
            'pa.*',
            'r.date_reservation',
            'r.time_reservation',
            'chat.chat_user_id'
        )
            ->where('r.id', '=', $id)
            ->get();
    }
    public function getByIdEtudiant($id)
    {
        return DB::table('reservations as r')
            ->leftJoin('users as u1', 'r.etudiant_id', '=', 'u1.id')
            ->leftJoin('users as u2', 'r.professeur_id', '=', 'u2.id')
            ->leftJoin('professeurs as p', 'u2.id', '=', 'p.user_id')
            ->leftJoin('categorie_matieres as cm', 'cm.id', '=', 'p.categorieMatiere_id')
            ->leftJoin('payments as pa', 'r.id', '=', 'pa.reservation_id')
            ->select(
                'r.id as reservation_id',
                'u1.name as etudiant',
                'u2.name as professeur',
                'r.dura',
                'u1.role as e', 
                'u2.role as p',
                'r.status',
                'pa.payment_id',
                'pa.payer_id',
                'pa.amount',
                'pa.currencym',
                'pa.payment_status',
                'r.updated_at',
                'p.*',
                'cm.nom',
                'u2.photo'
            )
            ->where('u1.id', '=', $id)

            ->paginate(3);
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
    public function reserverProfesseur($id)
    {
        return DB::table('reservations as r')
            ->leftJoin('users as u1', 'r.etudiant_id', '=', 'u1.id')
            ->leftJoin('users as u2', 'r.professeur_id', '=', 'u2.id')
            ->leftJoin('chats as chat', 'u1.id', '=', 'chat.sender_id')
            ->join('payments as pa', 'r.id', '=', 'pa.reservation_id')
            ->select(
                'r.id as reservation_id',
                'u2.name as professeur',
                'u1.name as etudiant',
                'u1.email',
                'u1.id as user_id',
                'r.status',
                'r.dura',
                'pa.payment_id',
                'pa.payer_id',
                'pa.amount',
                'pa.currencym',
                'pa.payment_status',
                'r.updated_at',
                'u2.role',
                'r.date_reservation',
                'r.time_reservation',
                DB::raw('MAX(chat.chat_user_id) as chat_user_id')
            )
            
            ->where('u2.role', '=', 'tuteur')
            ->where('u2.id', '=', $id)
            ->groupBy(
                'r.id',
                'u2.name',
                'u1.name',
                'u1.email',
                'r.status',
                'u1.id',
                'r.dura',
                'pa.payment_id',
                'pa.payer_id',
                'pa.amount',
                'pa.currencym',
                'pa.payment_status',
                'r.updated_at',
                'u2.role',
                'r.date_reservation',
                'r.time_reservation'
            )
            
            ->get();
    }
}