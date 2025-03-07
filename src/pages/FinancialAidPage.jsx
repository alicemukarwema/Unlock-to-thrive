import React from 'react';
import { Collapse, Button } from 'antd';
import { DollarOutlined, BankOutlined, CheckOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const FinancialAidPage = () => {
  const scholarships = [
    {
      id: 1,
      title: 'University of Cape Town Scholarship',
      description: 'Offers full scholarships for postgraduate studies to students from developing countries in Africa.',
      amount: 'Full Tuition',
      deadline: 'April 30, 2025',
      eligibility: 'Open to students from African countries with excellent academic performance and financial need.'
    },
    {
      id: 2,
      title: 'African Leadership University Scholarship',
      description: 'Provides financial aid to African students pursuing undergraduate and graduate programs in leadership, entrepreneurship, and business.',
      amount: 'Partial to Full Tuition',
      deadline: 'May 31, 2025',
      eligibility: 'Open to African students with leadership potential and financial need. Applicants must submit a leadership project proposal.'
    },
    {
      id: 3,
      title: 'University of Nairobi Undergraduate Scholarship',
      description: 'For Kenyan students pursuing undergraduate degrees at the University of Nairobi with financial constraints.',
      amount: 'Full Tuition',
      deadline: 'July 15, 2025',
      eligibility: 'Open to Kenyan students who demonstrate financial need and have excellent academic records.'
    },
    {
      id: 4,
      title: 'Makerere University Postgraduate Scholarship',
      description: 'Supports postgraduate students from East African countries, particularly in fields related to sustainable development.',
      amount: 'Up to $5,000',
      deadline: 'August 1, 2025',
      eligibility: 'Open to East African students with strong academic credentials and a focus on sustainable development research.'
    },
    {
      id: 5,
      title: 'African Development Bank Scholarship Program',
      description: 'Provides full scholarships for African students pursuing master’s degrees in areas like economics, engineering, and agriculture.',
      amount: 'Full Tuition and Stipend',
      deadline: 'June 30, 2025',
      eligibility: 'Open to students from African countries with a proven track record in development work or research.'
    },
  ];
  
  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">African University Scholarships & Grants</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Explore scholarships and financial aid opportunities offered by top African universities to help you further your education.
          </p>
        </div>
        
        {/* Overview Section */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 border border-gray-100 rounded-lg">
              <BankOutlined className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">University Scholarships</h3>
              <p className="text-gray-600">
                Scholarships and grants offered by universities across Africa to support students in need.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-100 rounded-lg">
              <DollarOutlined className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Financial Aid</h3>
              <p className="text-gray-600">
                Financial assistance for students from low-income backgrounds to support their education.
              </p>
            </div>
            <div className="text-center p-6 border border-gray-100 rounded-lg">
              <CheckOutlined className="text-4xl text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Grants for Research</h3>
              <p className="text-gray-600">
                Grants available for postgraduate students pursuing research in various academic fields.
              </p>
            </div>
          </div>
        </div>
        
        {/* Scholarships Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Available Scholarships</h2>
          
          <Collapse className="bg-white shadow-sm">
            {scholarships.map((scholarship) => (
              <Panel 
                key={scholarship.id} 
                header={
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{scholarship.title}</span>
                    <span className="text-purple-600">{scholarship.amount}</span>
                  </div>
                }
              >
                <p className="text-gray-600 mb-4">{scholarship.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="font-medium text-gray-700">Deadline:</p>
                    <p className="text-gray-600">{scholarship.deadline}</p>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Eligibility:</p>
                    <p className="text-gray-600">{scholarship.eligibility}</p>
                  </div>
                </div>
                <Button 
                  type="primary" 
                  className="bg-purple-600 hover:bg-purple-700 border-purple-600"
                >
                  Apply Now
                </Button>
              </Panel>
            ))}
          </Collapse>
        </div>
        
       
      </div> 
    </div>
  );
};

export default FinancialAidPage;
