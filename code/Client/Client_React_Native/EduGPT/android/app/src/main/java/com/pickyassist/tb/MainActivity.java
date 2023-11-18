package com.edugpt;

import com.facebook.react.ReactActivity;
// splash screen imports
import android.annotation.SuppressLint;
import android.os.Build;
import android.os.Bundle;
import android.content.Intent;
import android.provider.Settings;
import android.view.inputmethod.InputMethodManager;
import android.widget.Toast;

import android.content.pm.ShortcutManager;
import android.net.Uri;
import android.content.pm.ShortcutInfo;
import java.util.Arrays;
import java.util.Objects;

import android.graphics.drawable.Icon;

import org.devio.rn.splashscreen.SplashScreen;

public class MainActivity extends ReactActivity {


    // splash screen override methods
    @SuppressLint("WrongThread")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(null);

    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected String getMainComponentName() {
        return "EduGPT";
    }

}
