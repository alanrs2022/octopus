package com.octopus.teraHire.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmailDetails {
    public String recipient;
    public String msgBody;
    private String subject;
    private String attachment;

}
