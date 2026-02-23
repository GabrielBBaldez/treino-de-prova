package com.questify.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;

@Data
@AllArgsConstructor
public class QuizSummaryResponse {

    private String id;
    private String title;
    private String description;
    private String subject;
    private int questionCount;
    private Instant createdAt;
}
