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
        Schema::create('bah_rates', function (Blueprint $table) {
            $table->id();
            $table->string('zip_code', 5);
            $table->string('mha'); // Military Housing Area
            $table->string('state', 2);
            $table->string('pay_grade'); // E-1 through O-10
            $table->boolean('with_dependents');
            $table->decimal('rate', 10, 2);
            $table->integer('year');
            $table->timestamps();

            $table->index(['zip_code', 'pay_grade', 'with_dependents', 'year']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bah_rates');
    }
};
