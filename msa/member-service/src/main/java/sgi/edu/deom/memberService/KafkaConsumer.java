package sgi.edu.deom.memberService;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import lombok.extern.slf4j.Slf4j;
import sgi.edu.deom.memberService.service.AccountQueryService;

@Service
@Slf4j
public class KafkaConsumer {

    private final AccountQueryService accountQueryService;
    private final KafkaMessageProducer kafkaMessageProducer;

    @Autowired
    public KafkaConsumer(AccountQueryService accountQueryService, KafkaMessageProducer kafkaMessageProducer) {
        this.accountQueryService = accountQueryService;
        this.kafkaMessageProducer = kafkaMessageProducer;
    }
    
    @KafkaListener(topics = "companyUpdate", groupId = "updateCompanyGroupId")
    public void updateUserStarCnt(String kafkaMessage) throws ParseException {
        log.info("kafka Message : " + kafkaMessage);

        JSONParser parser = new JSONParser();
        Object obj = parser.parse(kafkaMessage);
        JSONObject jsonObj = (JSONObject) obj;
        log.info(jsonObj.get("id").toString());
        log.info(jsonObj.get("name").toString());
        log.info(jsonObj.get("orgName").toString());
        try{
            accountQueryService.updateComapnyAll(jsonObj.get("orgName").toString(), jsonObj.get("name").toString());
            kafkaMessageProducer.messageProducer().sendMessage(String.format("commit:%s",jsonObj.get("id").toString()));
        }
        catch(Exception ex){
            kafkaMessageProducer.messageProducer().sendMessage(String.format("rollback:%s",jsonObj.get("id").toString()));
        }
        return;
    }

}
