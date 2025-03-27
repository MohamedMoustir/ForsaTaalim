<?php
namespace App\Services;

use App\Interface\PaymentGatewayInterface;
use Omnipay\Omnipay;

class PayPalGatewayService implements PaymentGatewayInterface
{
    protected $gateway;

    public function __construct()
    {
        $this->gateway = Omnipay::create('PayPal_Rest');
        $this->gateway->setClientId(env('PAYPAL_CLIENT_ID'));
        $this->gateway->setSecret(env('PAYPAL_SECRET'));
        $this->gateway->setTestMode(true);
    }

    public function getGateway()
    {
        return $this->gateway;
    }
}
