import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'


function Faq() {
  return (
    <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-secondary mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Find quick answers to common questions about our services.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How long does the verification process take?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Most verifications are completed within 3-5 business days after all required documents are submitted. Complex cases may take longer.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">What documents do I need to submit for verification?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              You&apos;ll need to provide your court clearance documents, government-issued ID, and possibly additional supporting documentation depending on your specific case.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How do employers verify my status?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Employers can search for your verification using your unique verification ID or by entering your name and other identifying information on our verification portal.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  </section>
  )
}

export default Faq
