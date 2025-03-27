<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interface\PaymentGatewayInterface;
use App\Services\PayPalGatewayService;
class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
    $this->app->bind(PaymentGatewayInterface::class, PayPalGatewayService::class);
        
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}



