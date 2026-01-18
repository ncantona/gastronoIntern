import { computed, type Ref } from 'vue';

export interface PasswordStrength {
    hasMinLength: Ref<boolean>;
    hasLowercase: Ref<boolean>;
    hasUppercase: Ref<boolean>;
    hasSpecialChar: Ref<boolean>;
    passwordStrengthPercent: Ref<string>;
    passwordStrengthLabel: Ref<string>;
    passwordStrengthColor: Ref<string>;
}

/**
 * Validates and calculates password strength metrics
 * @param password - Reactive reference to the password string
 * @returns Object containing password validation checks and strength metrics
 */
export function usePasswordStrength(password: Ref<string>): PasswordStrength {
    const hasMinLength = computed(() => password.value.length >= 8);
    const hasLowercase = computed(() => /[a-z]/.test(password.value));
    const hasUppercase = computed(() => /[A-Z]/.test(password.value));
    const hasSpecialChar = computed(() => /[^A-Za-z0-9]/.test(password.value));

    const passwordScore = computed(() => {
        let score = 0;
        if (hasMinLength.value) score++;
        if (hasLowercase.value) score++;
        if (hasUppercase.value) score++;
        if (hasSpecialChar.value) score++;
        return score;
    });

    const passwordStrengthPercent = computed(() => `${(passwordScore.value / 4) * 100}%`);

    const passwordStrengthLabel = computed(() => {
        if (passwordScore.value <= 1) return 'Sehr schwach';
        if (passwordScore.value === 2) return 'Schwach';
        if (passwordScore.value === 3) return 'Okay';
        if (passwordScore.value === 4) return 'Stark';
        return 'Sehr stark';
    });

    const passwordStrengthColor = computed(() => {
        if (passwordScore.value <= 1) return '#ef4444';
        if (passwordScore.value === 2) return '#f97316';
        if (passwordScore.value === 3) return '#eab308';
        if (passwordScore.value === 4) return '#22c55e';
        return '#16a34a';
    });

    return {
        hasMinLength,
        hasLowercase,
        hasUppercase,
        hasSpecialChar,
        passwordStrengthPercent,
        passwordStrengthLabel,
        passwordStrengthColor
    };
}
