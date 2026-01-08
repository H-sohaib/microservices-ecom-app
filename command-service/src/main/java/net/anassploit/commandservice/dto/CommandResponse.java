package net.anassploit.commandservice.dto;

import net.anassploit.commandservice.enums.CommandStatus;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class CommandResponse {

    private Long commandId;
    private LocalDateTime date;
    private CommandStatus status;
    private BigDecimal totalPrice;
    private List<CommandItemResponse> items;

    public CommandResponse() {
    }

    public CommandResponse(Long commandId, LocalDateTime date, CommandStatus status, BigDecimal totalPrice, List<CommandItemResponse> items) {
        this.commandId = commandId;
        this.date = date;
        this.status = status;
        this.totalPrice = totalPrice;
        this.items = items;
    }

    public Long getCommandId() {
        return commandId;
    }

    public void setCommandId(Long commandId) {
        this.commandId = commandId;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public CommandStatus getStatus() {
        return status;
    }

    public void setStatus(CommandStatus status) {
        this.status = status;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    public List<CommandItemResponse> getItems() {
        return items;
    }

    public void setItems(List<CommandItemResponse> items) {
        this.items = items;
    }

    public static CommandResponseBuilder builder() {
        return new CommandResponseBuilder();
    }

    public static class CommandResponseBuilder {
        private Long commandId;
        private LocalDateTime date;
        private CommandStatus status;
        private BigDecimal totalPrice;
        private List<CommandItemResponse> items;

        public CommandResponseBuilder commandId(Long commandId) {
            this.commandId = commandId;
            return this;
        }

        public CommandResponseBuilder date(LocalDateTime date) {
            this.date = date;
            return this;
        }

        public CommandResponseBuilder status(CommandStatus status) {
            this.status = status;
            return this;
        }

        public CommandResponseBuilder totalPrice(BigDecimal totalPrice) {
            this.totalPrice = totalPrice;
            return this;
        }

        public CommandResponseBuilder items(List<CommandItemResponse> items) {
            this.items = items;
            return this;
        }

        public CommandResponse build() {
            return new CommandResponse(commandId, date, status, totalPrice, items);
        }
    }
}

