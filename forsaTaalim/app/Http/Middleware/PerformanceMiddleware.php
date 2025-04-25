<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class PerformanceMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
  
        public function handle($request, Closure $next)
        {
            $start = microtime(true);
            $response = $next($request);
            $duration = microtime(true) - $start;
            
            session(['load_time' => round($duration * 1000)]); 
    
            return $response;
        }
     
    
}
