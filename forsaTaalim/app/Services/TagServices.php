<?php

namespace App\Services;

use App\Models\CategorieMatiere;
use App\Models\Tag;
use App\Repositories\tagRepositories;
use App\Interface\CrudInterface;
use App\Repositories\AuthRepository;
use Illuminate\Support\Facades\Log;

class TagServices implements CrudInterface
{
    protected $tagRepositories;

    public function __construct(TagRepositories $tagRepositories)
    {
        $this->tagRepositories = $tagRepositories;
    }
    public function create(array $data)
    {
        return $this->tagRepositories->create($data);
    }
    public function getAll()
    {
        return Tag::all();
    }
    public function getById($id)
    {
        return Tag::findOrFail($id);
    }
    public function update($id, array $data)
    {

        return $this->tagRepositories->update($id, $data);

    }
    public function delete($id)
    {
        return $this->tagRepositories->delete($id);
    }
}
