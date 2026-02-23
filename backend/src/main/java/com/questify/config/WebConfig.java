package com.questify.config;

import com.questify.model.enums.QuizMode;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.convert.converter.Converter;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new Converter<String, QuizMode>() {
            @Override
            public QuizMode convert(String source) {
                return QuizMode.fromValue(source);
            }
        });
    }
}
