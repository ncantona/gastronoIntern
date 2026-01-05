<script setup lang="ts">
import CustomButton from '../General/CustomButton.vue';


</script>

<template>
    <div class="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100">
        
        <!-- Hero Section -->
        <section class="pt-20 pb-32 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200">
            <div class="max-w-6xl mx-auto">
                <div class="grid md:grid-cols-2 gap-12 items-center">
                    <div class="space-y-6">
                        <h1 class="text-5xl md:text-6xl font-bold text-slate-900 leading-tight">
                            Gastrono
                        </h1>
                        <p class="text-xl text-slate-600 leading-relaxed">
                            Schneller Service. Ohne das Warten. Gäste bestellen direkt über ihr Smartphone – Küche und Bar erhalten Bestellungen in Echtzeit. Effizient. Digital. Zukunft der Gastronomie.
                        </p>
                        <div class="flex gap-4 pt-4">
                            <CustomButton variant="editBlue">
                                Jetzt beginnen
                            </CustomButton>
                            <button class="px-8 py-3 border-2 border-slate-300 text-slate-700 font-semibold rounded-lg hover:border-slate-400 transition">
                                Mehr erfahren
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features Section -->
        <section class="py-20 px-4 sm:px-6 lg:px-8">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-4xl font-bold text-slate-900 text-center mb-16">
                    Unsere Funktionen
                </h2>
                
                <div class="grid md:grid-cols-3 gap-8">
                    <!-- Feature 1 -->
                    <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
                        <div class="text-4xl mb-4">📱</div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">
                            Digitale Bestellungen per QR-Code
                        </h3>
                        <p class="text-slate-600">
                            Gäste scannen den QR-Code am Tisch, wählen ihre Speisen und Getränke über die WebApp und zahlen direkt – kein Warten auf Kellner mehr.
                        </p>
                    </div>

                    <!-- Feature 2 -->
                    <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
                        <div class="text-4xl mb-4">⚡</div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">
                            Echtzeit-Kommunikation
                        </h3>
                        <p class="text-slate-600">
                            Bestellungen landen sofort in Küche, Bar und beim Servicepersonal. Automatische Benachrichtigungen für schnellere Abwicklung.
                        </p>
                    </div>

                    <!-- Feature 3 -->
                    <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
                        <div class="text-4xl mb-4">👨‍🍳</div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">
                            Küchen & Bar-Interface
                        </h3>
                        <p class="text-slate-600">
                            Strukturierte Übersicht aller Bestellungen pro Tisch mit intuitiven Touch-Bedienungen und automatischen Benachrichtigungen.
                        </p>
                    </div>

                    <!-- Feature 4 -->
                    <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
                        <div class="text-4xl mb-4">🕐</div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">
                            Transparente Zubereitungszeiten
                        </h3>
                        <p class="text-slate-600">
                            Gäste sehen die durchschnittlichen Kochzeiten und den Echtzeit-Status ihrer Bestellung – keine Überraschungen mehr.
                        </p>
                    </div>

                    <!-- Feature 5 -->
                    <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
                        <div class="text-4xl mb-4">📊</div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">
                            Datenbasierte Entscheidungen
                        </h3>
                        <p class="text-slate-600">
                            Verkaufsstatistiken, Beliebtheit von Gerichten und Stoßzeiten in übersichtlichen Dashboards für Restaurantmanager.
                        </p>
                    </div>

                    <!-- Feature 6 -->
                    <div class="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition">
                        <div class="text-4xl mb-4">💳</div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3">
                            Kontaktlose Bezahlung
                        </h3>
                        <p class="text-slate-600">
                            Zahlungsoptionen wie PayPal, Apple Pay und Google Pay direkt in der App – sicher, schnell und berührungslos.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Roles Section -->
        <section class="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-4xl font-bold text-slate-900 text-center mb-16">
                    Für jeden die richtige Rolle
                </h2>
                
                <div class="grid md:grid-cols-2 gap-12">

                    <!-- Gäste -->
                    <div class="space-y-4">
                        <h3 class="text-2xl font-bold text-slate-900">👥 Gäste</h3>
                        <p class="text-slate-600 mb-4">
                            Das beste Dining-Erlebnis direkt vom Tisch aus
                        </p>
                        <ul class="space-y-2 text-slate-600">
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Sofort bestellen – keine Wartezeit auf den Kellner
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Echtzeit-Status der Bestellung einsehen
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Transparente Zubereitungszeiten
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Kontaktlose Bezahlung
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Bewertungen und Treuepunkte
                            </li>
                        </ul>
                    </div>

                    <!-- Restaurants & Manager -->
                    <div class="space-y-4">
                        <h3 class="text-2xl font-bold text-slate-900">🏪 Restaurants & Manager</h3>
                        <p class="text-slate-600 mb-4">
                            Effiziente Betriebsverwaltung mit Dateneinblicken
                        </p>
                        <ul class="space-y-2 text-slate-600">
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Reduzierter Personalstress durch Automation
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Einfache Menüverwaltung in Sekunden
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Restaurant-Dashboard mit Tischübersicht
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Verkaufsstatistiken und Analyse
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Digitale Rechnungsabwicklung
                            </li>
                        </ul>
                    </div>

                    <!-- Kitchen -->
                    <div class="space-y-4">
                        <h3 class="text-2xl font-bold text-slate-900">👨‍🍳 Küchenpersonal</h3>
                        <p class="text-slate-600 mb-4">
                            Optimierte Schnittstelle für schnelle und effiziente Bestellabwicklung
                        </p>
                        <ul class="space-y-2 text-slate-600">
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Alle Speisen-Bestellungen übersichtlich nach Tischen
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Einzelne Speisen als fertig markieren
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Automatische Benachrichtigungen für Service
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Intuitive Touch-Bedienung mit Sicherheitsverzögerung
                            </li>
                        </ul>
                    </div>

                    <!-- Bar -->
                    <div class="space-y-4">
                        <h3 class="text-2xl font-bold text-slate-900">🍹 Bar-Personal</h3>
                        <p class="text-slate-600 mb-4">
                            Spezialisierte Schnittstelle für Getränkebestellungen
                        </p>
                        <ul class="space-y-2 text-slate-600">
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Alle Getränke-Bestellungen pro Tisch im Überblick
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Gesamte Bestellung als fertig markieren
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Sofortige Benachrichtigung an Service
                            </li>
                            <li class="flex items-center gap-3">
                                <span class="text-blue-600 font-bold">✓</span>
                                Intuitive Bedienung wie in der Küche
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div class="max-w-4xl mx-auto text-center space-y-8">
                <h2 class="text-4xl font-bold">
                    Die Zukunft der Gastronomie
                </h2>
                <div class="space-y-4 text-lg text-blue-100">
                    <p>✨ Ein Ort, an dem Service, Effizienz und Erlebnis zusammenkommen.</p>
                    <p>🤝 Eine Lösung, die Menschen verbindet, statt sie warten zu lassen.</p>
                    <p>⏰ Ein System, das Gastronom:innen mehr Zeit für das Wesentliche gibt – ihre Gäste.</p>
                </div>
                <button class="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition">
                    Jetzt starten
                </button>
            </div>
        </section>

    </div>
</template>