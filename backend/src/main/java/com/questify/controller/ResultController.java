package com.questify.controller;

import com.questify.dto.request.SubmitResultRequest;
import com.questify.dto.response.ResultResponse;
import com.questify.dto.response.ResultStatsResponse;
import com.questify.model.enums.QuizMode;
import com.questify.service.ResultService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/results")
@RequiredArgsConstructor
public class ResultController {

    private final ResultService resultService;

    @GetMapping
    public ResponseEntity<List<ResultResponse>> listResults(
            @RequestParam(required = false) String quizId,
            @RequestParam(required = false) QuizMode mode,
            Authentication auth) {
        return ResponseEntity.ok(resultService.listByUser(auth.getName(), quizId, mode));
    }

    @PostMapping
    public ResponseEntity<ResultResponse> submitResult(
            @Valid @RequestBody SubmitResultRequest request,
            Authentication auth) {
        ResultResponse response = resultService.submit(request, auth.getName());
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/stats")
    public ResponseEntity<ResultStatsResponse> getStats(
            @RequestParam(required = false) String quizId,
            Authentication auth) {
        return ResponseEntity.ok(resultService.getStats(auth.getName(), quizId));
    }

    @DeleteMapping
    public ResponseEntity<Void> clearResults(Authentication auth) {
        resultService.clearAll(auth.getName());
        return ResponseEntity.noContent().build();
    }
}
