package sgi.edu.deom.memberService;

import java.util.HashMap;
import java.util.Map;
 
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;

import lombok.extern.slf4j.Slf4j;
 
@EnableKafka
@Configuration
@Slf4j
public class KafkaConsumerConfig {
 
    
    @Autowired
    KafkaConsumerConfig(Environment env) {
        log.info(env.getProperty("bootstrap.servers"));
    }
    
    
    public ConsumerFactory<String, String> consumerFactory() {
        Map<String, Object> props = new HashMap<>();
        props.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG,"b-2.sgidemomsk.o9fr30.c4.kafka.ap-northeast-2.amazonaws.com:9092,b-3.sgidemomsk.o9fr30.c4.kafka.ap-northeast-2.amazonaws.com:9092,b-1.sgidemomsk.o9fr30.c4.kafka.ap-northeast-2.amazonaws.com:9092");
        props.put(ConsumerConfig.GROUP_ID_CONFIG,"company");
        props.put(ConsumerConfig.KEY_DESERIALIZER_CLASS_CONFIG,StringDeserializer.class);
        props.put(ConsumerConfig.VALUE_DESERIALIZER_CLASS_CONFIG,StringDeserializer.class);
        return new DefaultKafkaConsumerFactory<>(props);
    }
 
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory() {
 
        ConcurrentKafkaListenerContainerFactory<String, String> factory
                = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory());
        return factory;
    }
    
}