package com.questify.model;

import com.questify.model.enums.QuizMode;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.Map;

@Document(collection = "quiz_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuizResult {

    @Id
    private String id;

    @Indexed
    private String userId;

    @Indexed
    private String quizId;

    private String quizTitle;

    @NotNull
    private QuizMode mode;

    private Map<String, String> answers;

    private int correctCount;

    private int totalQuestions;

    private double percentage;

    private int timeTakenSeconds;

    private Instant completedAt;
}
