package sn.douanes.services;

import com.google.common.cache.CacheBuilder;
import com.google.common.cache.CacheLoader;
import com.google.common.cache.LoadingCache;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

@Service
public class LoginAttemptService {

    private static final int MAXIMUM_NUMBER_OF_ATTEMPTS = 5;
    private static final int ATTEMPTS_INCREMENT = 1;
    private LoadingCache<String, Integer> loadingAttemptCache;

    public LoginAttemptService() {
        super();
        loadingAttemptCache = CacheBuilder.newBuilder().expireAfterWrite(15, TimeUnit.MINUTES)
                .maximumSize(100).build(new CacheLoader<String, Integer>() { // 100 enregistrement dans le cache
                    public Integer load(String key) {
                        return 0;
                    }
                });
    }

    public void evictUserFromLoginAttemptCache(String username) { // supprimer la cle : username, ou adresse IP à bloquer par exemple
        loadingAttemptCache.invalidate(username);
    }

    public void addUserToLoginAttemptCache(String username) {
        int attempts = 0;

        try {
            attempts = ATTEMPTS_INCREMENT + loadingAttemptCache.get(username);
        } catch (ExecutionException e) {
            e.printStackTrace();
        }
        loadingAttemptCache.put(username, attempts); // ajouter au cache
    }

    public boolean hasExceededMaxAttempts(String username) {
        try {
            return loadingAttemptCache.get(username) >= MAXIMUM_NUMBER_OF_ATTEMPTS;
        } catch (ExecutionException e) {
            e.printStackTrace();
        }

        return false;
    }
}
