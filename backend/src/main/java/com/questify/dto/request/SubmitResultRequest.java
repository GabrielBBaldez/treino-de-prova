package com.questify.dto.request;

import com.questify.model.enums.QuizMode;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.Instant;
import java.util.Map;

@Data
public class SubmitResultRequest {

    @NotBlank
    private String quizId;

    @NotBlank
    private String quizTitle;

    @NotNull
    private QuizMode mode;

    @NotNull
    private Map<String, String> answers;

    private int correctCount;

    private int totalQuestions;

    private double percentage;

    private int timeTakenSeconds;

    private Instant completedAt;
}
