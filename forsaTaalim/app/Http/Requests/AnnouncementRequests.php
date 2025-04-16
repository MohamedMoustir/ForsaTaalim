<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnnouncementRequests extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        // You can perform authorization logic here if needed
        return true;  // Allow the request
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|max:255',
            'image'=>'required|file',
            'description' => 'required|string',
            'subjects' => 'required|string',
            'levels' => 'required|string',
            'location' => 'required|string|max:255',
            'date' => 'required|date',
        ];
    }

}
