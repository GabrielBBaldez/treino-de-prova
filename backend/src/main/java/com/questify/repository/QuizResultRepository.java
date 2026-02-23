package com.questify.repository;

import com.questify.model.QuizResult;
import com.questify.model.enums.QuizMode;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuizResultRepository extends MongoRepository<QuizResult, String> {

    List<QuizResult> findByUserId(String userId);

    List<QuizResult> findByUserIdAndQuizId(String userId, String quizId);

    List<QuizResult> findByUserIdAndMode(String userId, QuizMode mode);

    List<QuizResult> findByUserIdAndQuizIdAndMode(String userId, String quizId, QuizMode mode);

    void deleteByUserId(String userId);
}
