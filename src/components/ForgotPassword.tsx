"use client"
import { ChangePwd, SendOTP, VerifyOTP } from '@/hooks/changePwd';
import { useRouter } from 'next/navigation';
import React, { use } from 'react'
import { useState } from 'react'
const ForgotPassword = () => {
  const [otpsend, setotpsend] = useState(false);
  const [verifyotp, setverifyotp] = useState(false);
  const [email, setemail] = useState('');
  const [otp, setotp] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const router = useRouter()

  // Handler for sending OTP
  const handleSendOTP = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!email) {
          setError('Please enter your email address');
          return;
      }
      
      setLoading(true);
      setError('');
      try {
          const response = await SendOTP(email);
          setotpsend(true);
          setSuccess('OTP has been sent to your email');
      } catch (err: any) {
          setError(err.response?.data?.message || 'Failed to send OTP. Please try again.');
      } finally {
          setLoading(false);
      }
  };

  // Handler for verifying OTP
  const handleVerifyOTP = async () => {
      if (!otp) {
          setError('Please enter the OTP');
          return;
      }
      
      setLoading(true);
      setError('');
      try {
          const response = await VerifyOTP(email, otp);
          setverifyotp(true);
          setSuccess('OTP verified successfully');
      } catch (err: any) {
          setError(err.response?.data?.message || 'Invalid OTP. Please try again.');
      } finally {
          setLoading(false);
      }
  };

  // Handler for changing password
  const handleChangePassword = async (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      
      if (!password || !confirmpassword) {
          setError('Please enter both password fields');
          return;
      }
      
      if (password !== confirmpassword) {
          setError('Passwords do not match');
          return;
      }
      
      if (password.length < 6) {
          setError('Password must be at least 6 characters long');
          return;
      }
      
      setLoading(true);
      setError('');
      try {
          const response = await ChangePwd(email, password);
          setSuccess('Password changed successfully. You can now login with your new password.');
          router.push('/login'); // Redirect to login page after successful password change
          // Optionally redirect to login page after successful password change
          // window.location.href = '/login';
      } catch (err: any) {
          setError(err.response?.data?.message || 'Failed to change password. Please try again.');
      } finally {
          setLoading(false);
      }
  };

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      
      if (!otpsend) {
          handleSendOTP(e as unknown as React.MouseEvent<HTMLButtonElement>);
      } else if (!verifyotp) {
          handleVerifyOTP();
      } else {
          handleChangePassword(e as unknown as React.MouseEvent<HTMLButtonElement>);
      }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
    <div className="w-full max-w-md space-y-6 bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200 mx-4 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl"></div>

      <div className="text-center relative">
        <div className="inline-flex items-center justify-center mb-2">
          <span className="text-2xl font-bold text-yellow-500 transition-transform hover:scale-110 duration-300">
            Q
          </span>
          <span className="text-2xl font-bold text-black transition-transform hover:scale-110 duration-300">
            H
          </span>
          <span className="ml-1 inline-flex items-center justify-center h-5 w-12 rounded-full text-xs font-medium bg-gray-100">
            jobs
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Reset Password
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Forgot your password? Reset it here
        </p>
      </div>

      {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">{error}</div>}
      {success && <div className="p-3 text-sm text-green-600 bg-green-50 rounded-lg">{success}</div>}

      <form className="mt-8 space-y-5 relative" onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Email Field */}
            <div className="group">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={e => setemail(e.target.value)}
                  required
                  disabled={otpsend}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200 disabled:bg-gray-100"
                  placeholder="your@email.com"
                />
              </div>
            </div>
          { otpsend && !verifyotp && <label className='text-xs text-green-700 flex justify-center' htmlFor="">OTP has been successfully sent to your email.</label>}        

          {/* OTP Field */}
          { otpsend && !verifyotp && <div className="group">
              <div className="flex items-center justify-between mb-1">
              <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
              >
                  Enter OTP
              </label>
              </div>
              <div className="relative">
              <input
                  type='number'
                  id="otp"
                  value={otp}
                  onChange={e => setotp(e.target.value)}
                  required
                  className="block w-full appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [-moz-appearance:textfield] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200"
                  placeholder="Enter OTP here"
              />
              </div>
          </div>}
             
          {/* Password fields */}
          {
              otpsend && verifyotp && 
              <>
              <div className="group">
              <div className="flex items-center justify-between mb-1">
              <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
              >
                  New Password
              </label>
              </div>
              <div className="relative">
              <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={e => setpassword(e.target.value)}
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200"
                  placeholder="••••••••"
              />
              </div>
              </div>
              {/* Confirm password */}
              <div className="group">
              <div className="flex items-center justify-between mb-1">
              <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
              >
                  Confirm Password
              </label>
              </div>
              <div className="relative">
              <input
                  type="password"
                  id="confirmPassword"
                  value={confirmpassword}
                  onChange={e => setconfirmpassword(e.target.value)}
                  required
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-white text-gray-900 transition-all duration-200"
                  placeholder="••••••••"
              />
              </div>
              </div>
              </>
          }

        <div>
          <button
            type="submit"
            disabled={loading}
            className="w-full px-6 py-3 cursor-pointer text-base font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 shadow-md hover:shadow-lg transform transition-all duration-200 hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? 'Processing...' : 
              !otpsend ? 'Send OTP' : 
              !verifyotp ? 'Verify OTP' : 
              'Change Password'}
          </button>
        </div>
        </div>
      </form>
    </div>
  </div>
)
}

export default ForgotPassword