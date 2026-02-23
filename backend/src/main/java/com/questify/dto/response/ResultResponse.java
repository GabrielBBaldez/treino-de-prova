package com.questify.dto.response;

import com.questify.model.enums.QuizMode;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;
import java.util.Map;

@Data
@AllArgsConstructor
public class ResultResponse {

    private String id;
    private String quizId;
    private String quizTitle;
    private QuizMode mode;
    private Map<String, String> answers;
    private int correctCount;
    private int totalQuestions;
    private double percentage;
    private int timeTakenSeconds;
    private Instant completedAt;
}
