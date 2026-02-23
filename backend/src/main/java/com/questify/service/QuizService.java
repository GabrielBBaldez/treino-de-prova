package com.questify.service;

import com.questify.dto.request.CreateQuizRequest;
import com.questify.dto.request.UpdateQuizRequest;
import com.questify.dto.response.QuizResponse;
import com.questify.dto.response.QuizSummaryResponse;
import com.questify.exception.ResourceNotFoundException;
import com.questify.model.Quiz;
import com.questify.repository.QuizRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class QuizService {

    private final QuizRepository quizRepository;

    public List<QuizSummaryResponse> listByUser(String userId) {
        List<Quiz> quizzes = quizRepository.findByUserId(userId);
        return quizzes.stream()
                .map(q -> new QuizSummaryResponse(
                        q.getId(),
                        q.getTitle(),
                        q.getDescription(),
                        q.getSubject(),
                        q.getQuestions().size(),
                        q.getCreatedAt()
                ))
                .collect(Collectors.toList());
    }

    public QuizResponse getById(String id, String userId) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz nao encontrado: " + id));

        if (!quiz.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Quiz nao encontrado: " + id);
        }

        return toResponse(quiz);
    }

    public QuizResponse create(CreateQuizRequest request, String userId) {
        Quiz quiz = new Quiz();
        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setSubject(request.getSubject() != null ? request.getSubject() : "Outro");
        quiz.setQuestions(request.getQuestions());
        quiz.setUserId(userId);
        quiz.setCreatedAt(Instant.now());
        quiz.setUpdatedAt(Instant.now());

        quiz.getQuestions().forEach(q -> {
            if (q.getId() == null || q.getId().isBlank()) {
                q.setId(UUID.randomUUID().toString());
            }
        });

        quiz = quizRepository.save(quiz);
        return toResponse(quiz);
    }

    public QuizResponse update(String id, UpdateQuizRequest request, String userId) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz nao encontrado: " + id));

        if (!quiz.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Quiz nao encontrado: " + id);
        }

        quiz.setTitle(request.getTitle());
        quiz.setDescription(request.getDescription());
        quiz.setSubject(request.getSubject());
        quiz.setQuestions(request.getQuestions());
        quiz.setUpdatedAt(Instant.now());

        quiz.getQuestions().forEach(q -> {
            if (q.getId() == null || q.getId().isBlank()) {
                q.setId(UUID.randomUUID().toString());
            }
        });

        quiz = quizRepository.save(quiz);
        return toResponse(quiz);
    }

    public void delete(String id, String userId) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Quiz nao encontrado: " + id));

        if (!quiz.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Quiz nao encontrado: " + id);
        }

        quizRepository.delete(quiz);
    }

    private QuizResponse toResponse(Quiz quiz) {
        return new QuizResponse(
                quiz.getId(),
                quiz.getTitle(),
                quiz.getDescription(),
                quiz.getSubject(),
                quiz.getQuestions(),
                quiz.getUserId(),
                quiz.getCreatedAt(),
                quiz.getUpdatedAt()
        );
    }
}
