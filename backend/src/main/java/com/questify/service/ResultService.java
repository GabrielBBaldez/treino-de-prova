package com.questify.service;

import com.questify.dto.request.SubmitResultRequest;
import com.questify.dto.response.ResultResponse;
import com.questify.dto.response.ResultStatsResponse;
import com.questify.model.QuizResult;
import com.questify.model.enums.QuizMode;
import com.questify.repository.QuizResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ResultService {

    private final QuizResultRepository resultRepository;

    public List<ResultResponse> listByUser(String userId, String quizId, QuizMode mode) {
        List<QuizResult> results;

        if (quizId != null && mode != null) {
            results = resultRepository.findByUserIdAndQuizIdAndMode(userId, quizId, mode);
        } else if (quizId != null) {
            results = resultRepository.findByUserIdAndQuizId(userId, quizId);
        } else if (mode != null) {
            results = resultRepository.findByUserIdAndMode(userId, mode);
        } else {
            results = resultRepository.findByUserId(userId);
        }

        results.sort((a, b) -> b.getCompletedAt().compareTo(a.getCompletedAt()));

        return results.stream().map(this::toResponse).collect(Collectors.toList());
    }

    public ResultResponse submit(SubmitResultRequest request, String userId) {
        QuizResult result = new QuizResult();
        result.setUserId(userId);
        result.setQuizId(request.getQuizId());
        result.setQuizTitle(request.getQuizTitle());
        result.setMode(request.getMode());
        result.setAnswers(request.getAnswers());
        result.setCorrectCount(request.getCorrectCount());
        result.setTotalQuestions(request.getTotalQuestions());
        result.setPercentage(request.getPercentage());
        result.setTimeTakenSeconds(request.getTimeTakenSeconds());
        result.setCompletedAt(request.getCompletedAt() != null
                ? request.getCompletedAt()
                : Instant.now());

        result = resultRepository.save(result);
        return toResponse(result);
    }

    public ResultStatsResponse getStats(String userId, String quizId) {
        List<QuizResult> results = quizId != null
                ? resultRepository.findByUserIdAndQuizId(userId, quizId)
                : resultRepository.findByUserId(userId);

        if (results.isEmpty()) {
            return new ResultStatsResponse(0, 0.0, 0.0, 0.0);
        }

        int total = results.size();
        double avgPercent = results.stream()
                .mapToDouble(QuizResult::getPercentage).average().orElse(0);
        double best = results.stream()
                .mapToDouble(QuizResult::getPercentage).max().orElse(0);
        double avgTime = results.stream()
                .mapToInt(QuizResult::getTimeTakenSeconds).average().orElse(0);

        return new ResultStatsResponse(total, avgPercent, best, avgTime);
    }

    public void clearAll(String userId) {
        resultRepository.deleteByUserId(userId);
    }

    private ResultResponse toResponse(QuizResult r) {
        return new ResultResponse(
                r.getId(),
                r.getQuizId(),
                r.getQuizTitle(),
                r.getMode(),
                r.getAnswers(),
                r.getCorrectCount(),
                r.getTotalQuestions(),
                r.getPercentage(),
                r.getTimeTakenSeconds(),
                r.getCompletedAt()
        );
    }
}
