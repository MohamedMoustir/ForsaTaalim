<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class authRejecterRequist extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
            'photo' => 'required',
            'age' => 'required|integer|min:1',
            'telephone' => 'required|string|required|digits_between:10,15',
            'role' => 'required|in:tuteur,etudiant,parent,admin'
        ];
    }
}
