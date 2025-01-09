// onlinebook-controller.js

const OnlineBooking = require('../model/onlinebook-model');

// Controller to create a booking
exports.createBooking = async (req, res) => {
    const { doctor, date, timeSlot, user } = req.body;

    try {
        const newBooking = new OnlineBooking({
            doctor,
            date,
            timeSlot,
            user,
        });

        await newBooking.save();
        res.status(201).json({
            message: 'Booking created successfully!',
            booking: newBooking,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

// Controller to fetch bookings by user
exports.getUserBookings = async (req, res) => {
    const { user } = req.params;

    try {
        const bookings = await OnlineBooking.find({ user });
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};
