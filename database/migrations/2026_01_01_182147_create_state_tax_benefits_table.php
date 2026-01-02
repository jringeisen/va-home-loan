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
        Schema::create('state_tax_benefits', function (Blueprint $table) {
            $table->id();
            $table->string('state', 2)->unique();
            $table->boolean('income_tax_exempt')->default(false);
            $table->integer('property_tax_min_rating')->nullable(); // Minimum rating for property tax exemption
            $table->string('property_tax_exemption_type')->nullable(); // 'full', 'partial', 'percentage'
            $table->decimal('property_tax_exemption_amount', 12, 2)->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('state_tax_benefits');
    }
};
