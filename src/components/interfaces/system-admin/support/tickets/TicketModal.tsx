'use client';

import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Textarea,
  Chip,
  Avatar,
  Input,
} from '@nextui-org/react';
import {
  HiOutlinePaperClip,
  HiOutlineReply,
} from 'react-icons/hi';
import {
  tickets,
  ticketPriorities,
  ticketStatuses,
  type Ticket,
} from '@/lib/data/ticketsData';
import { formatDistanceToNow } from 'date-fns';
import { TicketTimeline } from './TicketTimeline';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketId: string | null;
}

export function TicketModal({ isOpen, onClose, ticketId }: TicketModalProps) {
  const [loading, setLoading] = useState(false);
  const [showReply, setShowReply] = useState(false);
  const [message, setMessage] = useState('');

  const ticket = tickets.find(t => t.id === ticketId);

  const handleSendMessage = async () => {
    setLoading(true);
    // TODO: Implement send message
    await new Promise(resolve => setTimeout(resolve, 1000));
    setMessage('');
    setShowReply(false);
    setLoading(false);
  };

  const getStatusColor = (status: string) => {
    return ticketStatuses.find(s => s.key === status)?.color || 'default';
  };

  const getPriorityColor = (priority: string) => {
    return ticketPriorities.find(p => p.key === priority)?.color || 'default';
  };

  if (!ticket) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span>{ticket.title}</span>
                <span className="text-small text-default-500">
                  {ticket.id}
                </span>
              </div>
              <div className="flex items-center gap-4 mt-2">
                <Chip
                  variant="flat"
                  size="sm"
                  color={getStatusColor(ticket.status) as any}
                  className="capitalize"
                >
                  {ticket.status.replace('_', ' ')}
                </Chip>
                <Chip
                  variant="flat"
                  size="sm"
                  color={getPriorityColor(ticket.priority) as any}
                  className="capitalize"
                >
                  {ticket.priority}
                </Chip>
              </div>
            </ModalHeader>

            <ModalBody>
              <div className="space-y-6">
                {/* Ticket Details */}
                <div className="flex items-start gap-4">
                  <Avatar
                    src={`https://i.pravatar.cc/150?u=${ticket.user.id}`}
                    size="lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{ticket.user.name}</span>
                      <span className="text-small text-default-500">
                        {ticket.user.role} at {ticket.user.school}
                      </span>
                    </div>
                    <p className="mt-2">{ticket.description}</p>
                    {ticket.messages[0].attachments && (
                      <div className="flex items-center gap-2 mt-2">
                        <HiOutlinePaperClip className="text-default-500" />
                        {ticket.messages[0].attachments.map((attachment) => (
                          <Button
                            key={attachment.id}
                            variant="flat"
                            size="sm"
                            className="text-small"
                          >
                            {attachment.name}
                          </Button>
                        ))}
                      </div>
                    )}
                    <div className="text-small text-default-500 mt-2">
                      {formatDistanceToNow(new Date(ticket.createdAt), { addSuffix: true })}
                    </div>
                  </div>
                </div>

                {/* Message Thread */}
                <div className="space-y-4">
                  {ticket.messages.slice(1).map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-4 ${
                        message.sender.role === 'staff'
                          ? 'flex-row'
                          : 'flex-row-reverse'
                      }`}
                    >
                      <Avatar
                        src={`https://i.pravatar.cc/150?u=${message.sender.id}`}
                        size="sm"
                      />
                      <div
                        className={`flex-1 max-w-[80%] p-3 rounded-lg ${
                          message.sender.role === 'staff'
                            ? 'bg-default-100'
                            : 'bg-primary-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{message.sender.name}</span>
                          <span className="text-small text-default-500">
                            {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="mt-1">{message.content}</p>
                        {message.attachments && (
                          <div className="flex items-center gap-2 mt-2">
                            <HiOutlinePaperClip className="text-default-500" />
                            {message.attachments.map((attachment) => (
                              <Button
                                key={attachment.id}
                                variant="flat"
                                size="sm"
                                className="text-small"
                              >
                                {attachment.name}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                <div className="mt-8">
                  <TicketTimeline ticket={ticket} />
                </div>
              </div>
            </ModalBody>

            <ModalFooter>
              <div className="w-full space-y-4">
                {!showReply ? (
                  <Button
                    color="primary"
                    className="w-full bg-black text-white"
                    startContent={<HiOutlineReply className="w-4 h-4" />}
                    onPress={() => setShowReply(true)}
                  >
                    Reply
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Input
                        type="file"
                        className="hidden"
                        id="file-upload"
                      />
                      <Button
                        variant="flat"
                        as="label"
                        htmlFor="file-upload"
                        startContent={<HiOutlinePaperClip className="w-4 h-4" />}
                      >
                        Attach Files
                      </Button>
                    </div>

                    <Textarea
                      placeholder="Type your message..."
                      value={message}
                      onValueChange={setMessage}
                      minRows={3}
                    />

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="flat"
                        onPress={() => setShowReply(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        color="primary"
                        className="bg-black text-white"
                        onPress={handleSendMessage}
                        isLoading={loading}
                        isDisabled={!message.trim()}
                      >
                        Send Message
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
