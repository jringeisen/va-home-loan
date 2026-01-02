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
        Schema::create('va_disability_rates', function (Blueprint $table) {
            $table->id();
            $table->integer('rating'); // 0-100 in 10% increments
            $table->integer('dependents')->default(0);
            $table->decimal('monthly_rate', 10, 2);
            $table->integer('year');
            $table->timestamps();

            $table->unique(['rating', 'dependents', 'year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('va_disability_rates');
    }
};
