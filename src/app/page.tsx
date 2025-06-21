import React from 'react'
import CompanionCard from '@/components/CompanionCard'
import CompanionList from '@/components/CompanionList'
import CTA from '@/components/CTA'
import { recentSessions } from '@/constants'
const Page = () => {
  return (
    <main>
      
      <h1 className='text-2xl underline'>Popular Companions</h1>
      <section className='home-section'>
      <CompanionCard
      id='123'
      name='Neura the Brainy Explorer'
      topic='Neural Network of the Brain'
      subject='science'
      duration={45}
      color='#ffda1e'
      />
      <CompanionCard
      id='434'
      name='Neuralink by Elon Musk'
      topic='Neural Network of the Brain'
      subject='Math'
      duration={45}
      color='#ffda6e'
      />
      <CompanionCard
      id='143'
      name='Neura the Brainy Explorer'
      topic='Language'
      subject='English Literature'
      duration={30}
      color='#bde7ff'
      />
      </section>
    <section className='home-section'>
      <CompanionList
      title='Recently completed session'
      companions={recentSessions}
      classNames='w-2/3 max-lg:w-full'
      />
      <CTA/>

    </section>
    </main>
  )
}

export default Page