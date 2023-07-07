package sgi.edu.deom.memberService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class KafkaConsumer {

    
    @Autowired
    public KafkaConsumer() {
    }
    
    @KafkaListener(topics = "customerTopic", groupId = "serviesConsumerGroupId")
    public void updateUserStarCnt(String kafkaMessage) {
        log.info("kafka Message : " + kafkaMessage);
    }

}
