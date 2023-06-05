package sgi.edu.deom.memberService;

import org.springframework.boot.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.*;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.*;
import org.springframework.web.bind.annotation.*;

@RestController
@EnableAutoConfiguration
public class MemberServiceApplication {

	// 이호진, 기본 Root API, health Check 용 입니다.
	@RequestMapping("/member")
    String home() {
        return "Hello World!";
    }


	

	public static void main(String[] args) {
		SpringApplication.run(MemberServiceApplication.class, args);
	}
}
