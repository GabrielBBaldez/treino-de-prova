package com.questify.controller;

import com.questify.dto.request.CreateQuizRequest;
import com.questify.dto.request.UpdateQuizRequest;
import com.questify.dto.response.QuizResponse;
import com.questify.dto.response.QuizSummaryResponse;
import com.questify.service.QuizService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/quizzes")
@RequiredArgsConstructor
public class QuizController {

    private final QuizService quizService;

    @GetMapping
    public ResponseEntity<List<QuizSummaryResponse>> listQuizzes(Authentication auth) {
        return ResponseEntity.ok(quizService.listByUser(auth.getName()));
    }

    @GetMapping("/{id}")
    public ResponseEntity<QuizResponse> getQuiz(@PathVariable String id, Authentication auth) {
        return ResponseEntity.ok(quizService.getById(id, auth.getName()));
    }

    @PostMapping
    public ResponseEntity<QuizResponse> createQuiz(
            @Valid @RequestBody CreateQuizRequest request,
            Authentication auth) {
        QuizResponse response = quizService.create(request, auth.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @PutMapping("/{id}")
    public ResponseEntity<QuizResponse> updateQuiz(
            @PathVariable String id,
            @Valid @RequestBody UpdateQuizRequest request,
            Authentication auth) {
        return ResponseEntity.ok(quizService.update(id, request, auth.getName()));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable String id, Authentication auth) {
        quizService.delete(id, auth.getName());
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}/export")
    public ResponseEntity<QuizResponse> exportQuiz(@PathVariable String id, Authentication auth) {
        return ResponseEntity.ok(quizService.getById(id, auth.getName()));
    }
}
