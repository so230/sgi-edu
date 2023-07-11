package sgi.edu.deom.memberService;

import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;


@SpringBootApplication
public class MemberServiceApplication {
	public static void main(String[] args) {
		SpringApplication.run(MemberServiceApplication.class, args);
	}
}
