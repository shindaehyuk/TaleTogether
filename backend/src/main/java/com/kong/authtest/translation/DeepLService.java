package com.kong.authtest.translation;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.deepl.api.*;
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DeepLService {
    private static final String authKey = "11fa2528-f4ff-31d4-f981-988ec10d6332:fx";
    private final Translator translator = new Translator(authKey);

    public String translateEN(String message) throws Exception{
        TextResult result = translator.translateText(message, null,"en-US");
        return result.getText();
    }

    public String translateKR(String message) throws Exception{
        TextResult result = translator.translateText(message, null, "ko");
        return result.getText();
    }
}
