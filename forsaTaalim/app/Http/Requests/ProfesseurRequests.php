<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProfesseurRequests extends FormRequest
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
            'categorieMatiere_id'=>'required',
            'diplomes' => 'required|string|max:255',
            'experiences' => 'required|string|max:255',
            'tarifHoraire' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'biographie' => 'required|string',
            'video' => 'nullable|file',
        ];
    }

    /**
     * Get custom error messages for validation.
     *
     * @return array
     */
    // public function messages()
    // {
    //     return [
    //         'nom.required' => 'The category nom is required.',   
    //     ];
    // }
}
