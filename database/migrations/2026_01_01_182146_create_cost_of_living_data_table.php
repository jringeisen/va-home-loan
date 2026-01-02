<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cost_of_living_data', function (Blueprint $table) {
            $table->id();
            $table->string('state', 2);
            $table->string('category'); // 'housing', 'utilities', 'transportation', 'healthcare', 'taxes'
            $table->decimal('index', 6, 2); // 100 = national average
            $table->decimal('median_value', 12, 2)->nullable();
            $table->integer('year');
            $table->timestamps();

            $table->unique(['state', 'category', 'year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cost_of_living_data');
    }
};
