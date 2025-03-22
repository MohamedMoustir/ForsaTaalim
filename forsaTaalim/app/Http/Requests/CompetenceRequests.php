<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CompetenceRequests extends FormRequest
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
            'name' => 'required|string|max:255',
            'niveau' => 'required|string|in:Débutant, Intermédiaire, Avancé',

        ];
    }

}
