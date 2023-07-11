package sgi.edu.deom.memberService;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

@Service
public class KafkaMessageProducer {
    @Bean
    public MessageProducer messageProducer() {
        return new MessageProducer();
    }

	public static class MessageProducer {
        @Autowired
        private KafkaTemplate<String, String> kafkaTemplate;

        public void sendMessage(String message) {

            CompletableFuture<SendResult<String, String>> future = kafkaTemplate.send("companyResult", message);
            future.whenComplete((result, ex) -> {

                if (ex == null) {
                    System.out.println("Sent message=[" + message + "] with offset=[" + result.getRecordMetadata()
                        .offset() + "]");
                } else {
                    System.out.println("Unable to send message=[" + message + "] due to : " + ex.getMessage());
                }
            });
        }
    }

}
