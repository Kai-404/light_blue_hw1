package gameplay.model;

import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.ArrayList;
import java.util.List;

public interface GameResultRepository extends MongoRepository<GameResult, String> {
    List<GameResult> findAllByUserIdOrderByDate(String userId);
}
