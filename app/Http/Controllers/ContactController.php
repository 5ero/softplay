<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Mail\ContactFormMail;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    public function store(ContactRequest $request)
    {
        $validated = $request->validated();

        Mail::to(config('mail.to_address', config('mail.from.address')))
            ->send(new ContactFormMail(
                name: $validated['name'],
                email: $validated['email'],
                phone: $validated['phone'],
                messageContent: $validated['message'],
            ));

        return back()->with('success', 'Thank you for your message! We will get back to you soon.');
    }
}
