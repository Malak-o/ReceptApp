package com.example.receptapp;

import android.content.Context;

import android.content.Context;
import


public class RequestManager {
    Context context;
    Retrofit retrofit = new Retrofit.Builder()
    .baseUrl("https://api.spoonacular.com")
    .addConverterFactory(GsonConverterFactory.create())
            .build();


    public RequestManager(Context context) {
        this.context = context;
    }

    private interface CallingRandomRecipe{

    }
}