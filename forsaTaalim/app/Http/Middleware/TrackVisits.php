<?php

namespace App\Http\Middleware;

use App\Models\Visit;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class TrackVisits
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        $ip = $request->ip();
        $url = $request->fullUrl();
        $cacheKey = "visit_{$ip}_{$url}";

        if (Cache::has($cacheKey)) {
            Visit::create([
                'ip' => $ip,
                'url' => $url,
            ]);

            Cache::put($cacheKey, true, now()->addMinutes(60)); 
              }
            return $next($request);
 
    }
}