package com.questify.model.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum QuizMode {
    SIMULADO("simulado"),
    ESTUDO("estudo"),
    REVISAO("revisao");

    private final String value;

    QuizMode(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static QuizMode fromValue(String value) {
        for (QuizMode mode : values()) {
            if (mode.value.equals(value)) {
                return mode;
            }
        }
        throw new IllegalArgumentException("Unknown QuizMode: " + value);
    }
}
