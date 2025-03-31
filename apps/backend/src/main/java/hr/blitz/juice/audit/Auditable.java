package hr.blitz.juice.audit;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Field;

@Getter
@Setter
public abstract class Auditable<U> {

    @CreatedBy
    @Field("created_by")
    protected U createdBy;

    @CreatedDate
    @Field("created_date")
    protected Long createdDate;

    @LastModifiedBy
    @Field("last_modified_by")
    protected U lastModifiedBy;

    @LastModifiedDate
    @Field("last_modified_date")
    protected Long lastModifiedDate;

    public abstract String getId();
}