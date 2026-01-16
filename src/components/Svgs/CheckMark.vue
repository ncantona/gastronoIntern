<template>
    
    <svg width="120" height="120" viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg">

    <!-- Grüner Kreis -->
    <circle
        cx="60"
        cy="60"
        r="50"
        fill="none"
        stroke="#2ecc71"
        stroke-width="8"
        stroke-linecap="round"
        stroke-dasharray="314"
        stroke-dashoffset="314">
        <animate
        attributeName="stroke-dashoffset"
        from="314"
        to="0"
        dur="0.8s"
        begin="0s"
        fill="freeze"/>
    </circle>

    <!-- Grünes Häkchen -->
    <path
        d="M35 62 L52 78 L85 42"
        fill="none"
        stroke="#2ecc71"
        stroke-width="8"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-dasharray="70"
        stroke-dashoffset="70">
        <animate
        attributeName="stroke-dashoffset"
        from="70"
        to="0"
        dur="0.8s"
        begin="0s"
        fill="freeze"/>
    </path>

    </svg>

</template>