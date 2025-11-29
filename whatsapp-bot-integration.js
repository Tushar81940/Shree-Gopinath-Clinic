// WhatsApp Bot Integration for Shree Gopinath Dental Care
// This script integrates with n8n webhook to enable automated WhatsApp bot functionality

class WhatsAppBotIntegration {
    constructor(webhookUrl) {
        this.webhookUrl = webhookUrl;
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Initialize the bot integration
        this.createBotWidget();
        this.setupEventListeners();
        this.isInitialized = true;
        console.log('WhatsApp Bot Integration initialized');
    }

    createBotWidget() {
        // Create a floating WhatsApp bot button
        const botWidget = document.createElement('div');
        botWidget.id = 'whatsapp-bot-widget';
        botWidget.innerHTML = `
            <div class="whatsapp-bot-container">
                <div class="whatsapp-bot-button" id="whatsapp-bot-btn">
                    <i class="fab fa-whatsapp"></i>
                    <span class="bot-indicator">Bot</span>
                </div>
                <div class="whatsapp-bot-popup" id="whatsapp-bot-popup">
                    <div class="bot-header">
                        <div class="bot-avatar">
                            <i class="fab fa-whatsapp"></i>
                        </div>
                        <div class="bot-info">
                            <h4>Dental Care Assistant</h4>
                            <p>Ask me about appointments, services, or any dental queries!</p>
                        </div>
                        <button class="close-bot" id="close-bot">×</button>
                    </div>
                    <div class="bot-content">
                        <div class="quick-actions">
                            <button class="quick-btn" data-action="book-appointment">📅 Book Appointment</button>
                            <button class="quick-btn" data-action="services">🦷 Our Services</button>
                            <button class="quick-btn" data-action="contact">📞 Contact Info</button>
                            <button class="quick-btn" data-action="emergency">🚨 Emergency</button>
                        </div>
                        <div class="bot-footer">
                            <p>Click any option to start chatting with our WhatsApp bot!</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add styles
        const styles = `
            <style>
                .whatsapp-bot-container {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 1000;
                    font-family: 'Poppins', sans-serif;
                }

                .whatsapp-bot-button {
                    width: 60px;
                    height: 60px;
                    background: linear-gradient(135deg, #25D366, #128C7E);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
                    transition: all 0.3s ease;
                    position: relative;
                    animation: pulse 2s infinite;
                }

                .whatsapp-bot-button:hover {
                    transform: scale(1.1);
                    box-shadow: 0 6px 25px rgba(37, 211, 102, 0.6);
                }

                .whatsapp-bot-button i {
                    font-size: 28px;
                    color: white;
                }

                .bot-indicator {
                    position: absolute;
                    top: -8px;
                    right: -8px;
                    background: #ff4444;
                    color: white;
                    font-size: 10px;
                    padding: 2px 6px;
                    border-radius: 10px;
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .whatsapp-bot-popup {
                    position: absolute;
                    bottom: 80px;
                    right: 0;
                    width: 320px;
                    background: white;
                    border-radius: 15px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(20px) scale(0.9);
                    transition: all 0.3s ease;
                }

                .whatsapp-bot-popup.active {
                    opacity: 1;
                    visibility: visible;
                    transform: translateY(0) scale(1);
                }

                .bot-header {
                    background: linear-gradient(135deg, #25D366, #128C7E);
                    color: white;
                    padding: 20px;
                    border-radius: 15px 15px 0 0;
                    display: flex;
                    align-items: center;
                    position: relative;
                }

                .bot-avatar {
                    width: 50px;
                    height: 50px;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-right: 15px;
                }

                .bot-avatar i {
                    font-size: 24px;
                }

                .bot-info h4 {
                    margin: 0 0 5px 0;
                    font-size: 16px;
                    font-weight: 600;
                }

                .bot-info p {
                    margin: 0;
                    font-size: 12px;
                    opacity: 0.9;
                }

                .close-bot {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 20px;
                    cursor: pointer;
                    width: 30px;
                    height: 30px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background 0.3s ease;
                }

                .close-bot:hover {
                    background: rgba(255, 255, 255, 0.2);
                }

                .bot-content {
                    padding: 20px;
                }

                .quick-actions {
                    display: grid;
                    gap: 10px;
                    margin-bottom: 15px;
                }

                .quick-btn {
                    background: #f8f9fa;
                    border: 1px solid #e9ecef;
                    border-radius: 8px;
                    padding: 12px 15px;
                    text-align: left;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-size: 14px;
                    font-weight: 500;
                }

                .quick-btn:hover {
                    background: #25D366;
                    color: white;
                    border-color: #25D366;
                    transform: translateX(5px);
                }

                .bot-footer {
                    text-align: center;
                    padding-top: 15px;
                    border-top: 1px solid #e9ecef;
                }

                .bot-footer p {
                    margin: 0;
                    font-size: 12px;
                    color: #6c757d;
                }

                @keyframes pulse {
                    0% {
                        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
                    }
                    50% {
                        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.8);
                    }
                    100% {
                        box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
                    }
                }

                @media (max-width: 768px) {
                    .whatsapp-bot-popup {
                        width: 280px;
                        right: -10px;
                    }
                }
            </style>
        `;

        // Add styles to head
        document.head.insertAdjacentHTML('beforeend', styles);
        
        // Add widget to body
        document.body.appendChild(botWidget);
    }

    setupEventListeners() {
        const botBtn = document.getElementById('whatsapp-bot-btn');
        const botPopup = document.getElementById('whatsapp-bot-popup');
        const closeBtn = document.getElementById('close-bot');
        const quickBtns = document.querySelectorAll('.quick-btn');

        // Toggle popup
        botBtn.addEventListener('click', () => {
            botPopup.classList.toggle('active');
        });

        // Close popup
        closeBtn.addEventListener('click', () => {
            botPopup.classList.remove('active');
        });

        // Handle quick actions
        quickBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const action = e.target.getAttribute('data-action');
                this.handleQuickAction(action);
                botPopup.classList.remove('active');
            });
        });

        // Close popup when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.whatsapp-bot-container')) {
                botPopup.classList.remove('active');
            }
        });
    }

    async handleQuickAction(action) {
        let message = '';
        let webhookData = {
            action: action,
            timestamp: new Date().toISOString(),
            source: 'website',
            userAgent: navigator.userAgent
        };

        switch (action) {
            case 'book-appointment':
                message = 'Hi! I would like to book an appointment with Dr. Sudha Singh. Please help me with available slots.';
                webhookData.intent = 'appointment_booking';
                break;
            case 'services':
                message = 'Hello! I would like to know more about the dental services offered at Shree Gopinath Dental Care.';
                webhookData.intent = 'service_inquiry';
                break;
            case 'contact':
                message = 'Hi! I need the contact information and location details for Shree Gopinath Dental Care.';
                webhookData.intent = 'contact_info';
                break;
            case 'emergency':
                message = 'URGENT: I have a dental emergency and need immediate assistance. Please help!';
                webhookData.intent = 'emergency';
                webhookData.priority = 'high';
                break;
            default:
                message = 'Hello! I have a query about dental services.';
                webhookData.intent = 'general_inquiry';
        }

        // Send data to n8n webhook
        try {
            await this.sendToWebhook(webhookData);
        } catch (error) {
            console.error('Failed to send webhook data:', error);
        }

        // Open WhatsApp with the message
        this.openWhatsAppWithMessage(message);
    }

    async sendToWebhook(data) {
        try {
            const response = await fetch(this.webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`Webhook request failed: ${response.status}`);
            }

            console.log('Webhook data sent successfully:', data);
            return await response.json();
        } catch (error) {
            console.error('Webhook error:', error);
            throw error;
        }
    }

    openWhatsAppWithMessage(message) {
        const phoneNumber = '917579165045';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }

    // Method to trigger bot from existing website functions
    triggerBot(intent, customMessage = null) {
        const webhookData = {
            action: intent,
            timestamp: new Date().toISOString(),
            source: 'website_integration',
            intent: intent
        };

        // Send to webhook
        this.sendToWebhook(webhookData).catch(console.error);

        // Open WhatsApp
        if (customMessage) {
            this.openWhatsAppWithMessage(customMessage);
        }
    }

    // Enhanced appointment booking with form data
    async bookAppointmentWithData(formData) {
        const webhookData = {
            action: 'book_appointment_with_data',
            timestamp: new Date().toISOString(),
            source: 'website_form',
            intent: 'appointment_booking',
            formData: formData
        };

        try {
            await this.sendToWebhook(webhookData);
        } catch (error) {
            console.error('Failed to send appointment data to webhook:', error);
        }

        // Create detailed WhatsApp message
        let message = `Hello Dr. Sudha Singh,\n\nI would like to book an appointment:\n\n`;
        message += `👤 *Name:* ${formData.name}\n`;
        message += `📞 *Phone:* ${formData.phone}\n`;
        if (formData.email) message += `📧 *Email:* ${formData.email}\n`;
        message += `🦷 *Service:* ${formData.service}\n`;
        message += `📅 *Preferred Date:* ${formData.date}\n`;
        if (formData.time) message += `⏰ *Preferred Time:* ${formData.time}\n`;
        if (formData.message) message += `💬 *Message:* ${formData.message}\n`;
        message += `\nThis request was sent through our automated booking system. Please confirm my appointment. Thank you!`;

        this.openWhatsAppWithMessage(message);
    }
}

// Initialize the WhatsApp bot integration when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // n8n webhook URL
    const webhookUrl = 'https://krishkumar1001.app.n8n.cloud/webhook/21ec3775-fab6-4a83-afe6-a26a652adc4f';
    
    // Initialize the bot
    window.whatsappBot = new WhatsAppBotIntegration(webhookUrl);
    
    // Override existing WhatsApp functions to integrate with bot
    const originalOpenWhatsApp = window.openWhatsApp;
    const originalBookAppointment = window.bookAppointment;
    const originalHandleAppointmentSubmit = window.handleAppointmentSubmit;

    // Enhanced openWhatsApp function
    window.openWhatsApp = function() {
        window.whatsappBot.triggerBot('general_inquiry', 'Hello Dr. Sudha Singh, I would like to book an appointment or have a query about dental services.');
    };

    // Enhanced appointment booking
    window.bookAppointment = function() {
        // Scroll to appointment section
        const appointmentSection = document.getElementById('contact');
        if (appointmentSection) {
            appointmentSection.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Trigger bot webhook
        window.whatsappBot.triggerBot('appointment_form_opened');
    };

    // Enhanced form submission
    window.handleAppointmentSubmit = function(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        
        // Validate required fields
        if (!data.name || !data.phone || !data.service || !data.date) {
            showToast('Please fill all required fields', 'error');
            return;
        }
        
        // Use enhanced booking with webhook integration
        window.whatsappBot.bookAppointmentWithData(data);
        
        // Show success message
        showToast('Appointment request sent! You will be redirected to WhatsApp.', 'success');
        
        // Reset form
        e.target.reset();
    };

    console.log('WhatsApp Bot Integration loaded successfully!');
});

// Export for global access
window.WhatsAppBotIntegration = WhatsAppBotIntegration;

