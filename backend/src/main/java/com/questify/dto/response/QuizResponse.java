package com.questify.dto.response;

import com.questify.model.Question;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
public class QuizResponse {

    private String id;
    private String title;
    private String description;
    private String subject;
    private List<Question> questions;
    private String userId;
    private Instant createdAt;
    private Instant updatedAt;
}
