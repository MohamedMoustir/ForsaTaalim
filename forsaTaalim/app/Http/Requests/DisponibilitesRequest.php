<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class DisponibilitesRequest extends FormRequest
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
            'teacher_id' => 'required|exists:teachers,id',
            'available_from' => 'required|date',
            'available_to' => 'required|date|after:available_from',
            'is_walkin' => 'required|boolean',
        ];
    }

}
