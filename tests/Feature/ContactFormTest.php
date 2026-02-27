<?php

use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;

use function Pest\Laravel\post;

it('sends contact form submissions including event date and location', function () {
    Mail::fake();

    $payload = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'phone' => '07942386386',
        'event_date' => '2026-06-21',
        'location' => 'Bedford',
        'message' => 'I would like to book a setup for a birthday party.',
    ];

    post(route('contact.store'), $payload)
        ->assertSessionHas('success');

    Mail::assertSent(ContactFormMail::class, function (ContactFormMail $mail) use ($payload) {
        return $mail->name === $payload['name']
            && $mail->email === $payload['email']
            && $mail->phone === $payload['phone']
            && $mail->eventDate === $payload['event_date']
            && $mail->location === $payload['location']
            && $mail->messageContent === $payload['message'];
    });
});

it('validates required contact fields including event date and location', function () {
    Mail::fake();

    post(route('contact.store'), [])
        ->assertSessionHasErrors([
            'name',
            'email',
            'phone',
            'event_date',
            'location',
            'message',
        ]);

    Mail::assertNothingSent();
});
