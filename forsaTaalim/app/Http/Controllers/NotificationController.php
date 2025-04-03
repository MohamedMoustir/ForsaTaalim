<?php

namespace App\Http\Controllers;

use App\Http\Requests\NotificationRequests;
use App\Services\NotificationServices;
use Illuminate\Support\Facades\Auth;
use Termwind\Components\Dd;


class NotificationController extends Controller
{
    protected $notificationServices;
    public function __construct(NotificationServices $notificationServices)
    {
        $this->notificationServices = $notificationServices;
    }
    public function create(NotificationRequests $request)
    {
        $validated = $request->validated();
        $notification = $this->notificationServices->create($validated);
        return response()->json(['message' => 'notification created successfully!', 'notification' => $notification], 201);
    }
    public function show()
    {
        $notification = $this->notificationServices->getById(Auth::id());
        return response()->json(['message' => ' notification', 'notification' => $notification]);
    }
    public function destroy($id)
    {
        $notification = $this->notificationServices->delete($id);
        return response()->json(['message' => 'notification deleted successfully!', 'Tags' => $notification], 200);
    }
}
